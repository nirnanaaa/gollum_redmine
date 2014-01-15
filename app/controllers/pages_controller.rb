class PagesController < ApplicationController
  unloadable


  def index
    @page = Page.find("Home")
    render :show
  end
  

  
  def show
    @page = Page.find(params[:page])
  end
end
