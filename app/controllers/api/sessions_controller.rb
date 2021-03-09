class Api::SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  # logging in
  def create
    @user = User.find_by_email(params[:email])
    if @user.password == params[:password]
      session[:user_id] = @user.id
      render :json => @user
    end
  end

  # logging out
  def destroy
    session[:user_id] = nil
    puts "LOGGGED OUT ~~~~~~~~~~"
  end
end