class HistoryController < ApplicationController
  unloadable

  before_filter :reset_path
  
  def show
    page = Gpage.find(params[:page])
    render_404 unless page
    @history = page.history
  end
  
  def global
    wiki = Gpage.wiki
    options = { pretty: 'raw' }
    log = wiki.repo.git.log(options, wiki.ref, "--")
    @history = Grit::Commit.list_from_string(wiki.repo, log)
    
    render :show
  end
  
  
  private
  
  def reset_path
    GollumRails::Setup.wiki_options = { :page_file_dir => nil }
  end
  
end
