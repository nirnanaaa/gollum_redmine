module MeetingsHelper
  include Gollum::AssetHelper
  
  def seperate_date(name)
    dname(name).first.gsub(/\_/, ".")
  end
  def dname(name)
    name.split("__")
  end
  
  def svar_clean(session_variable)
    sv = session[session_variable]
    session[session_variable] = nil
    sv
  end
end
