require_dependency 'gollum/my_plugin_hook'
Redmine::Plugin.register :gollum do
  name 'Gollum integration plugin'
  author 'Florian Kasper'
  description 'This is a plugin for integrating gollum into your app'
  version '0.0.1'
  url 'http://example.com/path/to/plugin'
  author_url 'http://floriankasper.org'
  
  menu :top_menu, :wiki, { :controller => 'pages', :action => 'index' }, :caption => :label_menu_gollum
  
  GollumRails::Setup.build do |config|

    config.repository = Rails.root.join('wiki.git')
  end
  

  #settings :default => {'empty' => true}, :partial => 'settings/holidays_settings'
  
end
