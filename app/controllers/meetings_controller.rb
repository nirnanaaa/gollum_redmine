class MeetingsController < ApplicationController
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
      flash[:error] = l(:error_description_cannot_be_empty)
      session[:meeting_description_content] = params[:description][:content]
      redirect_to new_meeting_protocol_path(@project)
    else
      @page = Page.create!(name: date(params[:description][:description]), format: :markdown, content: params[:description][:content], commit: commit_for(:create))
      flash[:notice] = l(:notice_meeting_successfully_saved)
      redirect_to meetings_path(@project)
    end
  rescue Gollum::DuplicatePageError => e
    flash[:error] = l(:error_page_already_exists)
    redirect_to meetings_path(@project)
  end
  def new
    
  end
  
  def update
    if @page
      @page.update_attributes(params[:description][:content], nil,
        :markdown, commit_for(:update))
      redirect_to meetings_path(project_id)
    end
  end
  
  def destroy
    render text: @page.to_yaml
    #page.delete(commit_for(:destroy))
    #puppetredirect_to meetings_path(@project)
  end
  
  def edit
  end
  
  private
  
  def title_updated(title)
    t = @page.title.split("__")
    "#{t.first}__#{title.gsub(' ', '_')}"
  end
  
  def set_gollum_path
    GollumRails::Setup.wiki_options = { :sanitization => false, :base_path => '', :page_file_dir => "#{Setting.plugin_gollum['meetings_prefix'][1..-1]}#{params[:project_id]}" }
  end
  
  def date(description)
    t = Time.now
    "#{t.day}_#{t.month}_#{t.year}__#{description.gsub(' ', '_')}"
  end
  

  def set_page
    GollumRails::Setup.wiki_options = { :page_file_dir => nil }
    
    @page = Page.find("#{path_prefix}/#{params[:meeting_id]}")
    
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
    (Setting.plugin_gollum['meetings_prefix'][1..-1] + @project.name).downcase
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
    {
      name: "#{current_user.firstname} #{current_user.lastname}",
      email: current_user.mail,
      message: a
    }
  end
  
end
