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
end
