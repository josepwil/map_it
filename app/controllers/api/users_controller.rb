class Api::UsersController < ApplicationController
  def index
    user_id = 1
    @user = User.find(user_id)
    render :json => @user
  end
end