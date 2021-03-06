class Api::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def show
    user_id = 1
    @user = User.find(user_id)
    render :json => @user
  end

  def create
    @user = User.find_by_email(params[:email])
    if @user.password == params[:password]
      render :json => @user
    end
  end
end