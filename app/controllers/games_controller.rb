class GamesController < ApplicationController
    skip_before_action :authorized, only: [:index, :show]
    def index
        games = Game.all
        render json: games
    end

    def show
        game = Game.find_by(id: params[:id])

        if game
            render json: game
        else
            render json: { error: "This game does not exist." }, status: :not_found
        end
        
    end
end
