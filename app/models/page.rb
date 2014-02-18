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
    html_data.gsub(/#(\d+|\d\s)\b/) do |m|
      m.strip!
      m = m[1..-1]
      if Issue.exists?(id: m.to_i)
        ActionController::Base.helpers.link_to("##{m}", "/issues/#{m}")
      else
        "##{m}"
      end
    end.html_safe
    #html_data.gsub(/#(\d+)/, Issue.exists?(id: '\1'.to_i) ? ActionController::Base.helpers.link_to('#\1','\1') : "123").html_safe
  end
  def directly_in_folder?(folder)
    !slice_folder(folder).include?('/')
  end

  def rename(newname, commit={})
    path = File.split(url)
    path =[path.first, newname].join("/")
    wiki.rename_page(gollum_page, path, commit)
    wiki.clear_cache
  end
  
  
end
