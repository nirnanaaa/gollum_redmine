module Gollum
  class MyPluginHook < Redmine::Hook::ViewListener
    render_on :view_projects_show_left, :partial => 'projects/show'
    render_on :view_layouts_base_body_bottom, :partial => 'shared/footer'
  end
end
