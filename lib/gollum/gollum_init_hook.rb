module Gollum
  class GollumInitHook < ::Rails::Railtie
    config.after_initialize do
      tries = 2
      begin
        GollumRails::Setup.build do |conf|
          conf.repository = ENV['GOLLUM_WIKI_LOCATION'] || Setting.plugin_gollum["repository_location"] 
        end
      rescue TypeError
        tries -= 1
        if tries > 0
          uuid = SecureRandom.uuid
          puts "No gollum_rails repository given. Initializing Empty repository in /tmp/wiki_%s.git" % uuid
          `git init --bare /tmp/wiki_#{uuid}.git`
          ENV['GOLLUM_WIKI_LOCATION'] = "/tmp/wiki_#{uuid}.git"
          puts "Please change your settings."
          retry
        else
          puts "No success initializing."
          exit 1
        end
      end
    end
  end
end
