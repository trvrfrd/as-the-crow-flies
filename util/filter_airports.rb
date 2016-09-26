#!/usr/bin/ruby
#
# filters a JSON database of the world's airports down to only those that are
# within the US. Database (not included in this repo) obtained from:
# https://github.com/mwgg/Airports
#
# Database should be placed in this directory (util/)
# Script should be run from project root

require 'json'

File.open('./util/airports.json', 'r') do |infile|
  # airports is a Hash of IATA code => data
  airports = JSON.load(infile)
  airports = airports.map { |_, v| v }
  airports.select! { |a| a["country"] == "US" && !a["iata"].empty? }
  # keep only necessary fields to reduce file size
  fields = %w(iata name city lat lon)
  airports.map! { |a| a.keep_if { |k, _| fields.include?(k) } }
  File.open('./data/airports.json', 'w') do |outfile|
    outfile.write(JSON.dump(airports))
  end
end
