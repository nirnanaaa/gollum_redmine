require_dependency 'gollum/my_plugin_hook'
require_dependency 'gollum/asset_helper'
require_dependency 'gollum/searches_controller_patch'
require_dependency 'gollum/gollum_init_hook'

Redmine::Plugin.register :gollum do
  name 'Gollum integration plugin'
  author 'Florian Kasper'
  description 'This is a plugin for integrating gollum into your app'
  version '0.0.1'
  url 'http://example.com/path/to/plugin'
  author_url 'http://floriankasper.org'
  
  menu :top_menu, :wiki, { :controller => 'pages', :action => 'index' }, :caption => :label_menu_gollum
  permission :polls, { :polls => [:index, :vote] }, :public => true
  menu :project_menu, :polls, { :controller => 'pages', :action => 'index' }, :caption => 'Polls', :after => :activity, :param => :project_id

  project_module :meetings do
    permission :view_meetings, {:meetings => [:index, :show] }
      
    permission :edit_meeting,
      {:meetings => [:create, :destroy, :new, :toggle_complete, :sort, :edit, :update],
        :issues => [:create, :destroy, :new, :toggle_complete, :sort, :edit, :update]}
   
  end

     
  menu :project_menu, :meetings, {:controller => 'meetings', :action => 'index'}, 
      :caption => :label_project_menu_meetings, :after => :activity, :param => :project_id
      
    

  settings :default => {
    'wiki_root' => Rails.root.join('wiki.git'),
    'default_page' => 'Home',
    'project_prefix' => '/projects/',
    'meetings_prefix' => '/meetings/',
  }, :partial => 'settings/gollum_settings'
  
end
