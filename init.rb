require_dependency 'gollum/my_plugin_hook'
Redmine::Plugin.register :gollum do
  name 'Gollum integration plugin'
  author 'Florian Kasper'
  description 'This is a plugin for integrating gollum into your app'
  version '0.0.1'
  url 'http://example.com/path/to/plugin'
  author_url 'http://floriankasper.org'
  menu :top_menu, :wiki, { :controller => 'pages', :action => 'index' }, :caption => :label_menu_gollum
  

  

  settings :default => {
    'wiki_root' => Rails.root.join('wiki.git'),
    'default_page' => 'Home'
    }, :partial => 'settings/gollum_settings'
  
end

GollumRails::Setup.build do |config|
  config.repository = Setting.plugin_gollum["repository_location"] 
  
end