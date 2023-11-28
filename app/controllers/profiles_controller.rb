class ProfilesController < ApplicationController
    skip_before_action :authorized, only: [:index, :create]
    def index
        profiles = Profile.all
        render json: profiles
    end
end