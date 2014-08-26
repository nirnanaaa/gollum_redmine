class GpagePolicy
  attr_reader :current_user, :model
  def initialize(current_user, model, extra=nil)
    @current_user = current_user
    @model = model
  end
  def settings
    @settings ||= Setting.plugin_gollum
  end
  def index?
    settings["index_by_all"] || @current_user.admin?
  end
  def show?
    gid = settings["show_perm"].to_i
    begin
      return true if @current_user.groups.find(gid)
    rescue ActiveRecord::RecordNotFound
    end
    @current_user.admin? || authorized_user_for_page?
    #@current_user.admin? || current_user.authorized_users.include?(current_user.login)
  end
  def create?
    gid = settings["create_perm"].to_i
    begin
      @current_user.admin? || @current_user.groups.find(gid)
    rescue ActiveRecord::RecordNotFound
      false
    end
  end
  def destroy?
    gid = settings["destroy_perm"].to_i
    begin
      @current_user.admin? || @current_user.groups.find(gid)
    rescue ActiveRecord::RecordNotFound
      false
    end
  end
  def can_update?
    gid = settings["update_perm"].to_i
    begin
      @current_user.admin? || authorized_user_for_page? || @current_user.groups.find(gid)
    rescue ActiveRecord::RecordNotFound
      false
    end
  end
  alias_method :update?, :can_update?
  alias_method :edit?, :can_update?

  def tree?
    @current_user.admin?
  end

  def authorized_user_for_page?
    @model.authorized_users.include?(@current_user.login)
  end
end
