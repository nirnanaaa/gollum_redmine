module Gollum
  class GollumInitHook < ::Rails::Railtie
    config.after_initialize do
      
      GollumRails::Setup.build do |config|
        config.repository = ENV['GOLLUM_WIKI_LOCATION'] || Setting.plugin_gollum["repository_location"] 
  
      end
      
    end
    
  end
end