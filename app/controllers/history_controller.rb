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

    repo = wiki.repo
    walker = Rugged::Walker.new(repo)
    walker.sorting(Rugged::SORT_DATE)
    walker.push(repo.last_commit)
    @history = walker.inject([]) do |a, c|
      a << {author: c.author, hash: c.oid, subject: c.message.split("\n").first}
      a
    end
    render :show
  end
  private
  def reset_path
    GollumRails::Setup.wiki_options = { :page_file_dir => nil }
  end
end
