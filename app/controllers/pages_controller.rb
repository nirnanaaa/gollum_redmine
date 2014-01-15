class PagesController < ApplicationController
  unloadable


  def index
    @page = Page.find(Setting["plugin_gollum"]["default_page"])
    render :show
  end
  

  
  def show
    @page = Page.find(params[:page])
  end
end
