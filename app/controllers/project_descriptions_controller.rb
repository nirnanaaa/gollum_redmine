class ProjectDescriptionsController < ApplicationController
  unloadable

  def new
    @prj = project.first
    @page = Page.new
  end
  
  def create
    @prj = project.first
    if @prj
      current_user = User.current
      begin
        @page = Page.create!(name: "/projects/#{@prj.name}",
        content: params[:pg][:content],
        format: :markdown,
        commit: { name: "#{current_user.firstname} #{current_user.lastname}",
                  email: current_user.mail,
                  message: "Created project description for project #{@prj.name}"
                 }
          )
          flash[:notice] = l(:saved)
        redirect_to project_path(@prj)
          
      rescue Gollum::DuplicatePageError => e
        flash[:error] = l(:error_duplicate_page)
        redirect_to project_path(@prj)
      end
        
    end
  end
  
  def edit
    @prj = project.first
    if @prj
      unless @page = Page.find("/projects/#{@prj.name}")

        redirect_to new_project_descriptions_path(@prj)
      end
    end
    
  end
  
  def update
    @prj = project.first
    if @prj
      current_user = User.current
      @page = Page.find("/projects/#{@prj.name}")
      
      @page.update_attributes(params[:pg][:content],nil,:markdown,{ 
        name: "#{current_user.firstname} #{current_user.lastname}",
        email: current_user.mail,
        message: "Created project description for project #{@prj.name}"
        }
      )
      flash[:notice] = l(:notice_page_updated)
      redirect_to project_path(@prj)
    end
  end
  
  private

  
  def project
    Project.where(identifier: params[:title])
  end
end
