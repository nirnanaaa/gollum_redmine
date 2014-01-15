module Gollum
  class MyPluginHook < Redmine::Hook::ViewListener
    render_on :view_projects_show_left, :partial => 'projects/show'
  end
end