require 'sinatra'

configure do
  set :views, File.dirname(__FILE__) + "/views"
  set :public, File.dirname(__FILE__) + "/.."
end

get '/' do
  haml :form
end

post '/' do
  response = "Files:\n"
  params[:files].each do |i, file|
    response += '- '+file[:filename]+"\n"
  end
  response += "\nSecret key: "+params[:secret_key] if params[:secret_key]
  response
end
