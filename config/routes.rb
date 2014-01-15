# Plugin's routes
# See: http://guides.rubyonrails.org/routing.html

get 'projects/descriptions/:title/new' => 'project_descriptions#new', as: :new_project_descriptions
get 'projects/descriptions/:title/edit' => 'project_descriptions#edit', as: :edit_project_descriptions
put 'projects/descriptions/:title' => 'project_descriptions#update', as: :update_project_descriptions
post 'projects/descriptions/:title' => 'project_descriptions#create', as: :project_descriptions
get 'pages' => 'pages#index'
#get 'pages/:folder' => "pages#folder", :constraints => {:folder => /.*/}, as: :show_folder
#get ":page" => "pages#show", :constraints => {:page => /.*/}, as: :show_post
