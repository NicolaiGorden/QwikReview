class GamesController < ApplicationController
    skip_before_action :authorized, only: [:index, :show]
    def index
        games = Game.all
        render json: games
    end

    def create
        game = Game.create(game_params)
        if game.valid?
            render json: game, status: :created
        else
            render json: { errors: game.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        game = Game.find_by(id: params[:id])

        if game
            render json: game
        else
            render json: { error: "This game does not exist." }, status: :not_found
        end
        
    end

    def destroy
        game = Game.find_by(id: params[:id])
        if game
            game.destroy
            head :no_content
        else
            render json: { error: "Bird not found" }, status: :not_found
        end
    end
    private

    def game_params
        params.permit(:name, :art, :guid)
    end
end
