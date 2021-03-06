module PagesHelper
  include Gollum::AssetHelper
  def folder_s
    if folder
      folder.gsub(/\/$/, "")
    else
      '.'
    end
  end
  def folder
    params[:folder]
  end
  def subfolder(post)
    post.subfolder(folder)
  end
  def combined_folder_link(post)
    "#{folder}#{post}"
  end
  def folder_posted?(post)
    @posts ||= []
    if @posts.include?(subfolder(post))
      true
    else
      @posts << subfolder(post)
      false
    end
    
  end
  
  def path_for_url(url)
    File.split(url).first
  end
  
  def parent_directory_link
    #return params[:folder]
    fldr = params[:folder] || path_for_url(params[:page])
    url_for path_for_url("/pages/"+fldr)
  end
end
