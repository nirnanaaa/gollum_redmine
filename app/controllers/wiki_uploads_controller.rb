class WikiUploadsController < ApplicationController
  unloadable
  def create
    resp = {files: []}
    params[:file].each do |file|
      if file
        fullname = Gollum::Page.cname(file.original_filename)
        tempfile = file.tempfile
      end

      dir = Setting["plugin_gollum"]["upload_destination"] || "uploads"
      ext = ::File.extname(fullname)
      format = ext.split('.').last || "txt"
      filename = ::File.basename(fullname, ext)
      contents = ::File.read(tempfile)

      committer = Gollum::Committer.new(Gpage.wiki, current_user_commit)
      committer.add_to_index(dir,filename,format,contents)
      committer.commit
      resp[:files] << {
        url: show_uploads_url(fullname),
        name: fullname,
        size: tempfile.size
      }
    end
    render json: resp
  end

  def new
  end

  def show
    dir = Setting["plugin_gollum"]["upload_destination"] || "uploads"
    path = File.join(dir, params[:filename])
    file = Gpage.wiki.file(path, Gpage.wiki.ref, true)
    if file
      send_data file.raw_data, type: 'application/octet-stream', disposition: 'inline'
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
