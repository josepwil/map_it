class Api::MapsController < ApplicationController 
  skip_before_action :verify_authenticity_token

  def index
    @user_id = session[:user_id]
    @maps = Map.where(user_id: @user_id)
       if @maps
          render json: {
          maps: @maps,
       }
      else
          render json: {
          status: 500,
          errors: ['no maps found']
      }
     end
  end

  def show
    @map = Map.find(params[:id])
    @markers = Marker.where(map_id: params[:id])
        if @map
          render json: {
          map: @map,
          markers: @markers

        }
        else
           render json: {
           status: 500,
           errors: ['user not found']
         }
        end
 end

 def create
  @user_id = session[:user_id]
  map = Map.new(
    title: params[:title],
    center: params[:center],
    user_id: @user_id
  )
 
  map.save
  map_id = map.id
  params[:markers].each do |marker|
    marker = Marker.new(
      map_id: map_id,
      coords: marker[:coords],
      popup: marker[:popup]
    )
    marker.save
  end
 end

def update
  map = Map.find(params[:id])
  map.update(title: params[:title])
  Marker.where(map_id: params[:id]).destroy_all
  params[:markers].each do |marker|
    marker = Marker.new(
      map_id: params[:id],
      coords: marker[:coords],
      popup: marker[:popup]
    )
    marker.save
  end

 end

 def destroy
  Marker.where(map_id: params[:id]).destroy_all
  Map.find(params[:id]).destroy
 end


end