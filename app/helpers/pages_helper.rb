module PagesHelper
  def folder
    params[:folder]
  end
  def subfolder(post)
    post.subfolder(folder)
  end
  def combined_folder_link(post)
    "#{folder}/#{subfolder(post)}"
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
  
  def parent_directory_link(title)
    #return params[:folder]
    fldr = params[:folder] || path_for_url(params[:page])
    link_to title, path_for_url("/pages/"+fldr), class: 'icon'
  end
end
