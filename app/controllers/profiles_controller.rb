class ProfilesController < ApplicationController
    include ActiveStorage::SetCurrent
    skip_before_action :authorized, only: [:index, :create, :show]
    def index
        profiles = Profile.all
        render json: profiles
    end

    def show
        profile = Profile.find_by(id: params[:id])
        if profile
          render json: profile
        else
          render json: { error: "Not authorized" }, status: :unauthorized
        end
    end

    def update
        user = User.find_by(id: session[:user_id])
        profile = user.profile
        if profile
            if profile.update(profile_params)
                render json: profile
            else
                render json: { errors: profile.errors.full_messages }, status: :unprocessable_entity
            end
        else
            render json: {error: "Profile not found"}, status: :not_found
        end
    end

    private

    def profile_params
        params.permit(:id, :bio, :avatar)
    end
end