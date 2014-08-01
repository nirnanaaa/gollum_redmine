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

  get 'newWikiUploads' => 'wiki_uploads#new', as: :new_upload
  post 'newWikiUploads' => 'wiki_uploads#create', as: :wiki_uploads
  get 'uploads/:filename' => 'wiki_uploads#show', as: :show_uploads, :constraints => { :filename => /.*/ }

  constraints(:folder => /.*/, :page => /.*/ ) do
    get '/pages' => 'pages#index', as: :pages_root
    get '/pages/history' => "history#global", as: :history
    get '/pages(/:folder)/new' => "pages#new", as: :new_page
    post '/pages(/:folder)' => "pages#create", as: :create_page
    get '/pages(/wiki)/:folder' => "pages#folder", as: :show_folder
    get "/wiki/:page/history" => "history#show", as: :page_history
    
    get "/wiki/:page/edit" => "pages#edit", as: :edit_page
    put "/wiki/:page/rename" => "pages#renamed", as: :renamed_page
  
    get "/wiki/:page/rename" => "pages#rename", as: :rename_page
    get '/wiki/:page/print(.:format)' => "pages#print", as: :print_page

    delete "/wiki/:page/delete" => "pages#destroy", as: :delete_page
    put "/wiki/:page" => "pages#update", as: :update_page
  
    get "/wiki/:page" => "pages#show", as: :show_post
  end


  
end
