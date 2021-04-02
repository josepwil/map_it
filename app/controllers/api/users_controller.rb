class Api::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @users = User.all
       if @users
          render json: {
          users: @users
       }
      else
          render json: {
          status: 500,
          errors: ['no users found']
      }
     end
  end

def show
   @user = User.find(params[:id])
       if @user
          render json: {
          user: @user
       }
       else
          render json: {
          status: 500,
          errors: ['user not found']
        }
       end
  end
  
  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      render json: {
        status: 'created',
        user: @user
      }
    end
  end


  private

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end