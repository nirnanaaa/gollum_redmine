class PagesController < ApplicationController
  unloadable

  before_filter :find_page, except: [ :index, :folder ]
  def index
    
    @page = Page.find(Setting["plugin_gollum"]["default_page"])
    render :show
  end
  

  
  def show
  end
  
  def edit
  end
  def update
    if params[:pg][:title]
      @page.rename(params[:pg][:title],{ 
        name: "#{current_user.firstname} #{current_user.lastname}",
        email: current_user.mail,
        message: params[:pg][:commit]
        })
    else
      @page.update_attributes(params[:pg][:content],nil,:markdown,{ 
        name: "#{current_user.firstname} #{current_user.lastname}",
        email: current_user.mail,
        message: params[:pg][:commit]
        }
      )
    end
    flash[:notice] = l(:notice_page_updated)
    redirect_to show_post_path(@page.url)
  end
  def destroy
  end
  def rename
  end
  
  def folder
    GollumRails::Setup.wiki_options = { :sanitization => false, :base_path => '', :page_file_dir => params[:folder] }

    @pages = Page.all
    render :index
  end
  
  
  private
  
  def reset_path
    
  end
  def current_user
    @current_user ||= User.current
  end
  def find_page
    GollumRails::Setup.wiki_options = { :page_file_dir => nil }
    
    @page = Page.find(params[:page])
    render_404 unless @page
    
  end
end
