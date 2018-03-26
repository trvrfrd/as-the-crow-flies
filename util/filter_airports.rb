#!/usr/bin/env ruby
#
# Downloads a JSON database of the world's airports and filters it down to only
# those that are within the US.
#
# Database is just some random one I found in this repo:
# https://github.com/mwgg/Airports
#
# This script is executable and should be run from project root, like so:
# $ ./util/filter_airports.rb
#
# If for some reason it's NOT executable:
# $ chmod +x ./util/filter_airports.rb

require 'json'
require 'open-uri'

db_url = 'https://raw.githubusercontent.com/mwgg/Airports/master/airports.json'
out_path = './data/airports.json'
required_fields = %w(iata name city state lat lon)

unless File.exist?(out_path)
  open(db_url, 'r') do |infile|
    # airports is a big hash of { IATA code => airport data hash, ...}
    airports = JSON.load(infile)
    # make an array of data hashes
    airports = airports.map { |_, v| v }
      .select! { |a| a["country"] == "US" && !a["iata"].empty? }
      .map! { |a| a.keep_if { |k, _| required_fields.include?(k) } }
    File.open(out_path, 'w') do |outfile|
      outfile.write(JSON.dump(airports))
    end
  end
end

