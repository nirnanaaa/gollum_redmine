class WikiUploadsController < ApplicationController
  unloadable
  def create
    if params[:file]
      fullname = Gollum::Page.cname(params[:file].original_filename)

      tempfile = params[:file].tempfile
    end

    dir = Setting["plugin_gollum"]["upload_destination"] || "uploads"
    ext = ::File.extname(fullname)
    format = ext.split('.').last || "txt"
    filename = ::File.basename(fullname, ext)
    contents = ::File.read(tempfile)
    reponame = filename + '.' + format

    head = Gpage.wiki.repo.head

    options = current_user_commit.merge(parent: head.commit)
    begin
      committer = Gollum::Committer.new(Gpage.wiki, options)
      committer.add_to_index(dir, filename, format, contents)
      committer.after_commit do |committer, sha|
        Gpage.wiki.clear_cache
        committer.update_working_dir(dir, filename, format)
      end
      committer.commit
      redirect_to(show_uploads_path(fullname),notice: l('label_was_uploaded_successfully'))
    rescue Gollum::DuplicatePageError => e
      redirect_to(show_uploads_path(fullname),error: l('label_was_found'))

    end
    
  end

  def new
  end

  def show
    dir = Setting["plugin_gollum"]["upload_destination"] || "uploads"
    path = File.join(dir, params[:filename])
    file = Gpage.wiki.file(path, Gpage.wiki.ref, true)
    if file
      if file.on_disk?
        send_file file.on_disk_path, :disposition => 'inline'
      else
        send_data file.raw_data, type: file.mime_type, disposition: 'inline'
      end
    else
      rsc = Rails.root.join('plugins', 'gollum', 'assets', 'image_notfound.png')
      begin
        send_file rsc, disposition: 'inline' 
      rescue ActionController::MissingFile => e
        render text: "File #{path} not found. Also the Rescue image was not found under #{rsc}"
      end
    end
  end


  private

  def current_user
   @user ||= User.current
  end
  def current_user_commit(message=nil)
    {
      name: "#{current_user.firstname} #{current_user.lastname}",
      email: current_user.mail,
      message: "Uploaded file" 
    }
  end
end
