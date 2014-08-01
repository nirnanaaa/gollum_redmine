class Gollum::Filter::Highlight < Gollum::Filter
  def extract(data)
    return data if @markup.format == :txt
    data.gsub!(/^([ \t]*)(!!!+) ?([^\r\n]+)?\r?\n(.+?)\r?\n\1(!!!+)[ \t\r]*$/m) do
      m_indent = $1
      m_start  = $2 # !!!
      m_lang   = $3
      m_code   = $4
      m_end    = $5 # !!!

      next '' if m_start.length != m_end.length

      langs  = ["success","info","warning","danger"]
      lang   = (m_lang && langs.include?(m_lang)) ? m_lang.strip : nil
      id     = Digest::SHA1.hexdigest("#{lang}.#{m_code}")
      cached = @markup.check_cache(:code, id)

      # extract lang from { .ruby } or { #stuff .ruby .indent }
      # see http://johnmacfarlane.net/pandoc/README.html#delimited-code-blocks

      @map[id] = cached ?
          { :output => cached } :
          { :lang => lang, :code => m_code, :indent => m_indent }

      "#{m_indent}#{id}" # print the SHA1 ID with the proper indentation
    end

    data
  end

  def process(data)
    return data if data.nil? || data.size.zero? || @map.size.zero?

    blocks = []

    @map.each do |id, spec|
      next if spec[:output] # cached

      code = spec[:code]

      blocks << [spec[:lang], code]
    end

    highlighted = []
    blocks.each do |lang, code|
      c_code = GitHub::Markup.render(@markup.name, code)
      if lang
        highlighted << "<div class=\"alert alert-#{lang}\">#{c_code}</div>"
      else
        highlighted << "<div class=\"alert alert-danger\">#{c_code}</div>"
      end
    end

    @map.each do |id, spec|
      body = spec[:output] || begin
        if (body = highlighted.shift.to_s).size > 0
          @markup.update_cache(:code, id, body)
          body
        else
         "#{CGI.escapeHTML(spec[:code])}"
        end
      end
      data.gsub!(id) do
        body
      end
    end

    data
  end
end
