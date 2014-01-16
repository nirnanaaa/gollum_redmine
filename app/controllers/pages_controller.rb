class PagesController < ApplicationController
  unloadable


  def index
    @page = Page.find(Setting["plugin_gollum"]["default_page"])
    render :show
  end
  

  
  def show
    @page = Page.find(params[:page])
  end
  
  def folder
    GollumRails::Setup.wiki_options = { :sanitization => false, :base_path => '', :page_file_dir => params[:folder] }

    @pages = Page.all
    render :index
  end
end
