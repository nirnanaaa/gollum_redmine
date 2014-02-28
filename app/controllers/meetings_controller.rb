class MeetingsController < ApplicationController
  helper :gollum
  include GollumHelper

  unloadable

  before_filter :set_gollum_path
  before_filter :find_project
  before_filter :set_page, only: [ :edit, :update, :destroy, :show ]
  
  def index
    Page.wiki.clear_cache
    @pages = Page.all
  end

  def show
  end

  def create
    if params[:description][:description].empty? 
      session[:meeting_description_content] = content 
      redirect_to new_meeting_protocol_path(@project), error: l(:error_description_cannot_be_empty)
    else
      @page = Page.create!(name: date(params[:description][:description]), 
                           format: format,
                           content: content,
                           commit: commit_for(:create))
      redirect_to meetings_path(@project), notice: l(:notice_meeting_successfully_saved)
    end
  rescue Gollum::DuplicatePageError => e
    redirect_to meetings_path(@project), error: l(:error_page_already_exists)
  end

  def new
  end
  
  def update
    @page.update_attributes(content, 
                            nil,
                            @page.format, 
                            commit_for(:update))
    redirect_to meetings_path(project_id), notice: l(:notice_meeting_successfully_saved)
  end
  
  def destroy
    @page.delete(commit_for(:destroy))
    redirect_to meetings_path(@project)
  end
  
  def edit
  end
  
  private

  def content
    params[:description][:content]
  end
  
  def title_updated(title)
    t = @page.title.split("__")
    "#{t.first}__#{title.gsub(/(\s|-)+/, '_')}"
  end
  
  def set_gollum_path
    GollumRails::Setup.wiki_options = { :sanitization => false, :base_path => '', :page_file_dir => "#{Setting.plugin_gollum['meetings_prefix'][1..-1]}#{params[:project_id]}" }
  end
  
  def date(description)
    t = Time.now
    cur = "#{t.day} #{t.month} #{t.year}  #{gpage_description(description)}"
    Gollum::Page.cname(cur, '_')
  end

  def gpage_description(description)
    Gollum::Page.cname(description)
  end
  
  def set_page
    GollumRails::Setup.wiki_options = { :page_file_dir => nil }
    page = File.join(path_prefix, params[:meeting_id].strip)
    @page = Page.find(page)
    render_404 unless @page
  end
  
  def find_project
    @project = Project.find(project_id)
  rescue ActiveRecord::RecordNotFound
    render_404
  end
  
  def project_id
    params[:project_id] || (params[:meeting] && params[:meeting][:project_id]) 
  end
  
  def path_prefix
    path = Setting.plugin_gollum['meetings_prefix'] + @project.identifier
    File.join(path).downcase
  end
  
  def commit_for(action)
    current_user = User.current
    case action
      when :create
        a = "Created meeting protocol"
      when :update
        a = "Updated meeting protocol"
      when :destroy
        a = "Destroyed meeting protocol"
    end
    commit(a)
  end
  
end
