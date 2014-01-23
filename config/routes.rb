# Plugin's routes
# See: http://guides.rubyonrails.org/routing.html

RedmineApp::Application.routes.draw do
  get 'projects/descriptions/:title/new' => 'project_descriptions#new', as: :new_project_descriptions
  get 'projects/descriptions/:title/edit' => 'project_descriptions#edit', as: :edit_project_descriptions
  put 'projects/descriptions/:title' => 'project_descriptions#update', as: :update_project_descriptions
  post 'projects/descriptions/:title' => 'project_descriptions#create', as: :project_descriptions
  get 'projects/:project_id/meetings' => 'meetings#index', as: :meetings
  get 'projects/:project_id/meetings/new' => 'meetings#new', as: :new_meeting_protocol
  get 'projects/:project_id/meetings/:meeting_id/edit' => 'meetings#edit', as: :edit_meeting_protocol
  put 'projects/:project_id/meetings/:meeting_id' => 'meetings#update', as: :update_meeting_protocol
  delete 'projects/:project_id/meetings/:meeting_id' => 'meetings#destroy', as: :delete_meeting_protocol

  post 'projects/:project_id/meetings' => 'meetings#create', as: :create_meetings
  get 'projects/:project_id/meetings/:meeting_id' => 'meetings#show', as: :show_meeting_protocol

  get '/pages' => 'pages#index'
  get '/pages/:folder' => "pages#folder", :constraints => {:folder => /.*/}, as: :show_folder
  
  get "wiki/:page/edit" => "pages#edit", :constraints => {:page => /(.*)/}, as: :edit_page
  get "wiki/:page/rename" => "pages#rename", :constraints => {:page => /(.*)/}, as: :rename_page
  delete "wiki/:page/delete" => "pages#destroy", :constraints => {:page => /(.*)/}, as: :delete_page
  put "wiki/:page" => "pages#update", :constraints => {:page => /(.*)/}, as: :update_page
  
  get "wiki/:page" => "pages#show", :constraints => {:page => /(.*)/}, as: :show_post
end
