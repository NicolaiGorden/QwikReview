class ReviewsController < ApplicationController
    skip_before_action :authorized, only: [:index]

    def index
        reviews = Review.all
        render json: reviews
    end

    def create
        user = User.find_by(id: session[:user_id])
        review = user.reviews.create(review_params)

        if review.valid?
            render json: review, status: :created
        else   
            render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def review_params
        params.permit(:title, :body, :game_id, :score)
    end
end
