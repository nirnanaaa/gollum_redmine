class WikiUploadsController < ApplicationController
  unloadable
  def create
    if params[:file]
      fullname = params[:file].original_filename
      tempfile = params[:file].tempfile
    end

    dir = Setting["plugin_gollum"]["upload_destination"] || "uploads"
    ext = ::File.extname(fullname)
    format = ext.split('.').last || "txt"
    filename = ::File.basename(fullname, ext)
    contents = ::File.read(tempfile)
    reponame = filename + '.' + format

    head = Page.wiki.repo.head

    options = current_user_commit.merge(parent: head.commit)
    begin
      committer = Gollum::Committer.new(Page.wiki, options)
      committer.add_to_index(dir, filename, format, contents)
      committer.after_commit do |committer, sha|
        Page.wiki.clear_cache
        committer.update_working_dir(dir, filename, format)
      end
      committer.commit
      redirect_to(show_uploads_path(params[:file].original_filename),notice: l('label_was_uploaded_successfully'))
    rescue Gollum::DuplicatePageError => e
      redirect_to(show_uploads_path(params[:file].original_filename),error: l('label_was_found'))

    end
    
  end

  def new
  end

  def show
    dir = Setting["plugin_gollum"]["upload_destination"] || "uploads"
    path = File.join(dir, params[:filename])
    file = Page.wiki.file(path, Page.wiki.ref, true)
    if file.on_disk?
      send_file file.on_disk_path, :disposition => 'inline'
    else
      send_data file.raw_data, type: file.mime_type, disposition: 'inline'
    end
  end


  private

  def current_user
    User.current
  end
  def current_user_commit(message=nil)
    {
      name: "#{current_user.firstname} #{current_user.lastname}",
      email: current_user.mail,
      message: "Uploaded file" 
    }
  end
end
