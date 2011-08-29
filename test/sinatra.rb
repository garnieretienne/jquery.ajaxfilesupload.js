require 'sinatra'

configure do
  set :views, File.dirname(__FILE__) + "/views"
  set :public, File.dirname(__FILE__) + "/.."
end

get '/' do
  haml :form
end

post '/' do
  'Secret key: '+params[:secret_key] if params[:secret_key]
end
