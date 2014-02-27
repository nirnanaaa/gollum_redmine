# TODO:
#
# support more formats than markdown! replace :markdown with something better.
#
class PagesController < ApplicationController
  unloadable

  before_filter :find_page, except: [ :index, :folder, :new, :create ]

  # GET /pages
  def index
    default_page = Setting["plugin_gollum"]["default_page"]
    @page = Page.find(default_page, Page.wiki.ref, true, false)
    if @page
      render :show
    else
      redirect_to new_page_path(title: default_page)
    end
  end

  # GET /pages/(:folder)/new
  def new
  end

  # POST /pages/(:folder)
  def create
    Page.reset_folder
    Page.create!(name: join_params,
      format: :markdown,
      content: params[:pg][:content],
      commit: current_user_commit)
    redirect_to show_post_path(join_params)
  rescue Gollum::DuplicatePageError => e
    # TODO: perform update action
    redirect_to show_post_path(join_params), notice: l(:label_page_exists)
  end

  # GET /wiki/:path
  def show
  end

  # GET /wiki/:path/edit
  def edit
  end

  # PUT /wiki/:path
  def update
    Page.reset_folder
    @page.update_attributes(params[:pg][:content], nil, :markdown, current_user_commit)
    redirect_to show_post_path(@page.url), notice: l(:notice_page_updated)
  end

  # DELETE /wiki/:path
  def destroy
    Page.reset_folder
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
      @page.rename(params[:pg][:title],current_user_commit)
      redirect_to show_post_path(@page.url), notice: l(:notice_page_renamed_successfully)
    end
  end

  # GET /pages/:folder
  def folder
    @pages = Page.all(folder: params[:folder])
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

  def find_page
    @page = Page.find(params[:page], Page.wiki.ref, true)
    render_404 unless @page
  end
end
