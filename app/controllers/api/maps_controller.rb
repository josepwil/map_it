class Api::MapsController < ApplicationController 
  def index
    @maps = Map.all
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

end