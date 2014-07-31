class ProjectDescriptionsController < ApplicationController
  unloadable

  def new
    @prj = project.first
    @page = Gpage.new
  end

  def create
    @prj = project.first
    if @prj
      current_user = User.current
      begin
        @page = Gpage.create!(name: "#{Setting.plugin_gollum['project_prefix']}#{@prj.name}",
        content: params[:pg][:content],
        format: :markdown,
        commit: { name: "#{current_user.firstname} #{current_user.lastname}",
                  email: current_user.mail,
                  message: "Created project description for project #{@prj.name}"
                 }
          )
          flash[:notice] = l(:notice_page_saved)
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
      unless @page = Gpage.find("#{Setting.plugin_gollum['project_prefix']}#{@prj.name}")

        redirect_to new_project_descriptions_path(@prj)
      end
    end
  end
  def update
    @prj = project.first
    if @prj
      current_user = User.current
      @page = Gpage.find("#{Setting.plugin_gollum['project_prefix']}#{@prj.name}")
      @page.update_attributes(content: params[:pg][:content],commit: {
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
