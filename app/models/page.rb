class Page < GollumRails::Page
  
  def page_dir
    self.class.wiki.page_file_dir
  end
  
  def in_folder?(folder)
    page_dir.to_s == folder
  end
  
  def subfolder(folder=nil)
    slice_folder(folder).split("/").first
  end
  
  def folder
    File.split(url).first
  end
  
  def slice_folder(folder)
    return url if folder.nil? || folder.empty? || folder == "/" 
    folder = folder[1..-1] if folder.start_with?('/')
    folder << '/' unless folder.end_with?('/')
    url.tap{|s| s.slice!(folder)}
  end
  
  def render_html_with_redmine_tags
    html_data.gsub(/((?!("|>)).)#(\d+|\d\s)\b/) do |m|
      m.strip!
      m = m[1..-1]
      if Issue.exists?(id: m.to_i)
        ActionController::Base.helpers.link_to("##{m}", "/issues/#{m}")
      else
        "##{m}"
      end
    end.html_safe
  end


  def sanitized_filename
    Page.sanitize_filename(name)
  end
  def self.sanitize_filename(filename)
    fn = filename.split /(?<=.)\.(?=[^.])(?!.*\.[^.])/m
    fn.map! { |s| s.gsub /[^a-z0-9\-]+/i, '_' }
    return fn.join '.'
  end
  def directly_in_folder?(folder)
    !slice_folder(folder).include?('/')
  end

  def rename(newname, commit={})
    path = File.split(url)
    npath = [path.first, newname].join("/")
    wiki.rename_page(gollum_page, npath, commit)
    wiki.clear_cache
    @gollum_page = wiki.paged(newname, path.first, true)
    update_attrs
    self
  end
  
  
end
