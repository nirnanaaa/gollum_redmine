class PagesController < ApplicationController
  unloadable

  before_filter :find_page, except: [ :index, :folder, :new, :create ]
  def index
    @page = Page.find(Setting["plugin_gollum"]["default_page"], Page.wiki.ref, true)
    if @page
      render :show
    else
      render_404
    end
  end
  

  def new
  end
  
  def create
    Page.create(name: join_params,
      format: :markdown,
      content: params[:pg][:content],
      commit: current_user_commit)
    redirect_to show_post_path(join_params)
  end
  
  def show
  end
  
  def edit
  end
  def update

    @page.update_attributes(params[:pg][:content],nil,:markdown,current_user_commit)
    flash[:notice] = l(:notice_page_updated)
    redirect_to show_post_path(@page.url)
  end
  
  def destroy
    @page.delete(current_user_commit("Removed Page"))
    flash[:notice] = l(:notice_page_deleted)
    redirect_to(show_folder_path(@page.folder))
  end
  
  def rename
  end
  
  def renamed
    if params[:pg][:title]
      @page.rename(params[:pg][:title],current_user_commit)
    else
    end
    redirect_to show_folder_path(@page.folder)
  end
  
  def folder

    GollumRails::Setup.wiki_options = { :sanitization => false, :base_path => '', :page_file_dir => params[:folder] }
    @pages = Page.all
    render :index
  end
  
  
  private
  
  def current_user_commit(message=nil)
    { 
      name: "#{current_user.firstname} #{current_user.lastname}",
      email: current_user.mail,
      message: message || params[:pg][:commit]
    }
  end
  
  def join_params
    fn = params[:pg][:title]
    File.join(params[:folder]||"", params[:pg][:title]).gsub(/^\//, '')
  end
  
  def current_user
    @current_user ||= User.current
  end

  
  def reset_page_dir
    GollumRails::Setup.wiki_options = { :page_file_dir => nil }
    
  end
  def find_page
    reset_page_dir
    @page = Page.find(params[:page])
    render_404 unless @page
    
  end
end
