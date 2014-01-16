class Page < GollumRails::Page
  def in_folder?(folder)
    self.class.wiki.page_file_dir.to_s == folder
  end
  
  
  
end