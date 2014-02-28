module GollumHelper
  def format
    @format ||= (Setting.plugin_gollum["format"]||"markdown").to_sym
  end

  def current_user
    @current_user ||= User.current
  end

  def commit(message)
    {
      name: "#{current_user.firstname} #{current_user.lastname}",
      email: current_user.mail,
      message: message
    }
  end
end
