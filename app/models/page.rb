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
  
  def slice_folder(folder)
    return url if folder.nil? || folder.empty? || folder == "/" 
    folder = folder[1..-1] if folder.start_with?('/')
    folder << '/' unless folder.end_with?('/')
    url.tap{|s| s.slice!(folder)}
  end
  
  def directly_in_folder?(folder)
    !slice_folder(folder).include?('/')
  end

  def rename(newname, commit={})
    path = File.split(url)
    path.last.gsub!(title,newname)
    wiki.rename_page(gollum_page, path.join("/"), commit)
    wiki.clear_cache
  end
  
  
end