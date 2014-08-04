# TODO:
#
# support more formats than markdown! replace :markdown with something better.
#
class PagesController < ApplicationController
  helper :gollum
  include GollumHelper

  unloadable

  before_filter :find_page, except: [ :index, :folder, :new, :create ]
  #before_filter :authorize, only: [:index]

  # GET /pages
  def index
    default_page = Setting["plugin_gollum"]["default_page"]
    @page = Gpage.find(default_page, Gpage.wiki.ref, true, false)
    if @page
      render :show
    else
      redirect_to new_page_path(title: default_page)
    end
  end

  # GET /print/:page.(:format)
  def print
    respond_to do |format|
      format.html{
      }
      format.pdf{
        require 'tempfile'
        temp = Tempfile.new(SecureRandom.uuid)
      }
    end
  end

  # GET /pages/(:folder)/new
  def new
  end

  # POST /pages/(:folder)
  def create
    Gpage.reset_folder
    Gpage.create!(name: join_params.force_encoding("UTF-8"),
      format: format,
      content: params[:pg][:content].force_encoding("UTF-8"),
      commit: current_user_commit)
    redirect_to show_post_path(join_params)
  rescue Gollum::DuplicatePageError
    # TODO: perform update action
    redirect_to show_post_path(join_params), notice: l(:label_page_exists)
  end

  # GET /wiki/:path
  def show
    Gpage.reset_folder
  end

  # GET /wiki/:path/edit
  def edit
  end

  # PUT /wiki/:path
  def update
    Gpage.reset_folder
    @page.update_attributes(content: params[:pg][:content],name: @page.name, format: @page.format, commit: current_user_commit)
    redirect_to show_post_path(@page.url), notice: l(:notice_page_updated)
  end

  # DELETE /wiki/:path
  def destroy
    Gpage.reset_folder
    @page.delete(current_user_commit("Removed Page"))
    redirect_to show_folder_path(@page.folder), notice: l(:notice_page_deleted)
  end

  # GET /wiki/:path/rename
  def rename
  end

  # PUT /wiki/:path/renamed
  def renamed
    if params[:pg][:title].empty?
      redirect_to show_post_path(@page.url), error: l(:error_page_title_not_present)
    else
      render text: params[:pg][:title]

      #@page.update_attributes(name:params[:pg][:title],commit:current_user_commit)
      #redirect_to show_post_path(@page.url), notice: l(:notice_page_renamed_successfully)
    end
  end

  def folder
    #GollumRails::Setup.wiki_options = { :page_file_dir => params[:folder], :base_path => '' }
    #
    @pages = Gpage.tree(folder: params[:folder])
    render :index2
  end

  private

  def current_user_commit(message=nil)
    commit(message||params[:pg][:commit])
  end

  def join_params
    fn = params[:pg][:title]
    File.join(params[:folder]||"", params[:pg][:title]).gsub(/^\//, '')
  end

  def find_page
    @page = Gpage.find(params[:page], Gpage.wiki.ref, true)
    redirect_to new_page_path(title: params[:page]), notice: l(:notice_page_does_to_exist) unless @page
  end
end
