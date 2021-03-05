class Api::UsersController < ApplicationController
  def index
    render :json => {
      name: "Brian"
    }
  end
end