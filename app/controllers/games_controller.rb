class GamesController < ApplicationController
    skip_before_action :authorized, only: [:index]
    def index
        games = Game.all
        render json: games
    end
end
